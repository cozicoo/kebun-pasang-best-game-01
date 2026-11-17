import { createState, rotate, undo, startFlow, stepFlow } from './logic.js';
// Injected scheduler permits testing queued callbacks even after clearTimeout.
export function createRuntime(levels, notify, schedule = setTimeout, cancel = clearTimeout) {
  let index = 0, state = createState(levels[index]), timer = null, generation = 0;
  function invalidate() {
    generation++;
    if (timer !== null) cancel(timer);
    timer = null;
  }
  function emit() { notify(state, levels[index], index); }
  function queue() {
    const token = generation;
    timer = schedule(() => {
      if (token !== generation || state.phase !== 'flowing') return;
      timer = null;
      state = stepFlow(state, levels[index]);
      emit();
      if (token === generation && state.phase === 'flowing') queue();
    }, 400);
  }
  function restart() {
    invalidate(); state = createState(levels[index]); emit();
  }
  return {
    getState: () => state,
    getIndex: () => index,
    rotate(key) { state = rotate(state, key); emit(); },
    undo() { state = undo(state); emit(); },
    flow() {
      if (state.phase !== 'planning') return;
      state = startFlow(state); emit(); queue();
    },
    restart,
    next() {
      if (state.phase !== 'won') return;
      index = (index + 1) % levels.length; restart();
    },
  };
}

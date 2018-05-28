export function applyArguments(handler, ...data) {
  return function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (!e.called) {
      e.called = true;
      e.data = data;
    }
    handler.call(this, e, ...e.data);
    return false;
  };
}

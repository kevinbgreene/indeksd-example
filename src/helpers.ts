export function clearChildren(parent: HTMLElement): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function onSelector<EventName extends keyof GlobalEventHandlersEventMap>(
  selector: string,
  eventName: EventName,
  callback: (e: GlobalEventHandlersEventMap[EventName]) => void,
): void {
  document.addEventListener(eventName, (e) => {
    if ((e.target as Element).closest(selector)) {
      callback(e);
    }
  });
}

export function querySelector<Target extends Element>(
  parent: ParentNode,
  selector: string,
): Target {
  const target = parent.querySelector<Target>(selector);
  if (target == null) {
    throw new Error(`Unable to find element with selector: ${selector}`);
  }
  return target;
}

export function closest<Target extends Element>(
  node: Element,
  selector: string,
): Target {
  const target = node.closest<Target>(selector);
  if (target == null) {
    throw new Error(`Unable to find element with selector: ${selector}`);
  }
  return target;
}

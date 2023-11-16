export type Protocol = 'tcp' | 'udp';

export type Range = {
  start: number;
  end: number;
};

export type PortBinding<THost = number, TContainer = number> = {
  hostPort: THost;
  protocol: Protocol;
  containerPort: TContainer;
  publishMode: 'ingress' | 'host' | undefined;
};

export type Value =
  | PortBinding<number | undefined, number | undefined>
  | PortBinding<Range, Range | number | undefined>;

export function isProtocol(value?: string): value is Protocol {
  return value === 'tcp' || value === 'udp';
}

export function isRange(value: Range | number | undefined): value is Range {
  return typeof value !== 'number';
}
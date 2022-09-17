import { Container } from 'typedi';

export interface DependencyInfo<D> {
  name: string;
  dependency: D;
}

const dependencyInjector = <D = unknown>(dependencies: DependencyInfo<D>[]): void => {
  dependencies.forEach(d => {
    Container.set(d.name, d.dependency);
  });
};

export default dependencyInjector;

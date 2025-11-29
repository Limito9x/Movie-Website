import { EntityConfig } from "./types";
import { movieConfig } from "./movie.config";

export const entityConfig: Record<string, EntityConfig> = {
  movie: movieConfig,
};

export const getEntityConfig = (entity: string): EntityConfig | null => {
  return entityConfig[entity] || null;
};

export const isValidEntity = (entity: string): boolean => {
  return !!entityConfig[entity];
};

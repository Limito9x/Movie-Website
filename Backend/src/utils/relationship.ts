import { Model } from "sequelize";

function toPascalCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export async function syncRelationship(
  modelInstance: Model,
  relation: string, // Ex: actors or Actors, TAGS, Genres...
  ids: number[]
) {
  if (!modelInstance) return;
  // Check if the IDs array exists and is not empty
  if (ids && ids.length > 0) {
    // Get the relationship method from the model instance
    const methodName = `set${toPascalCase(relation)}`;
    const relationshipMethod = (modelInstance as any)[methodName];

    // Ensure the method exists and can be called
    if (typeof relationshipMethod === "function") {
      await relationshipMethod.call(modelInstance, ids);
    } else {
      console.error(`Method '${methodName}' not found on model instance.`);
    }
  }
}

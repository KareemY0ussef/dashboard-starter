import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function catchErrorTypedAsync<
  T,
  E extends new (message?: string) => Error
>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>]> {
  try {
    const data = await promise;
    return [undefined, data];
  } catch (error: any) {
    if (errorsToCatch == undefined) {
      return [error];
    }
    if (errorsToCatch.some((e) => error instanceof e)) {
      return [error];
    }
    throw error;
  }
}

export function catchErrorTypedSync<
  T,
  E extends new (message?: string) => Error
>(promise: T, errorsToCatch?: E[]): [undefined, T] | [InstanceType<E>] {
  try {
    const data = promise;
    return [undefined, data];
  } catch (error: any) {
    if (errorsToCatch == undefined) {
      return [error];
    }
    if (errorsToCatch.some((e) => error instanceof e)) {
      return [error];
    }
    throw error;
  }
}

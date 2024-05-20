import { useAtomValue } from "jotai";
import { akkaReducerAtom } from "./reducer";

export function useAKKAState() {
  return useAtomValue(akkaReducerAtom)
}
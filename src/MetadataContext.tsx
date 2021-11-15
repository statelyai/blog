import { Metadata } from "./types";
import { createRequiredContext } from "./utils";
import { makeMetadata } from "../content/metadata";

export const [MetadataProvider, useMetadata] = createRequiredContext<{
  default: Metadata;
  makeMetadata: typeof makeMetadata;
}>("metadata");

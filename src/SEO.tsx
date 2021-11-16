import { NextSeo } from "next-seo";
import React, { useMemo } from "react";
import { useMetadata } from "./MetadataContext";
import { MetadataOverrides } from "./types";

export const Seo: React.FC<MetadataOverrides> = (props) => {
  const metadata = useMetadata();
  const overrideMetadata = useMemo(() => metadata.makeMetadata(props), [
    metadata,
    props,
  ]);
  return <NextSeo {...overrideMetadata} />;
};

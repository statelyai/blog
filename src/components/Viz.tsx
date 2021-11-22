import React, { useMemo } from "react";
import { EmbedProps } from "../types";
import { makeEmbedUrl } from "../utils";

interface VizProps extends Partial<EmbedProps> {
  id: string;
  title: string; // Required for a11y and testing
}

const defaultEmbedProps: EmbedProps = {
  mode: "viz",
  panel: "code",
  showOriginalLink: 1,
  readOnly: 1,
  pan: 0,
  zoom: 0,
  controls: 1,
};

export const Viz: React.FC<VizProps> = ({
  id,
  title,
  children,
  ...embedProps
}) => {
  const embedUrl = useMemo(() => {
    const embedPropsWithDefaults = {
      ...defaultEmbedProps,
      ...embedProps,
    };
    return makeEmbedUrl(id, embedPropsWithDefaults);
  }, [id, embedProps]);

  return (
    <iframe
      title={title}
      style={{
        display: "block",
        width: "100%",
        minHeight: 400,
        marginBlock: "1rem",
      }}
      src={embedUrl}
    />
  );
};

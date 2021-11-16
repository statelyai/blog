import React, { useMemo } from "react";

type EmbedMode = "viz" | "panels" | "full";

type EmbedPanel = "code" | "state" | "events" | "actors" | "settings";

interface EmbedProps {
  mode: EmbedMode;
  panel: EmbedPanel;
  showOriginalLink: 0 | 1;
  readOnly: 0 | 1;
  pan: 0 | 1;
  zoom: 0 | 1;
  controls: 0 | 1;
}
interface VizProps {
  id: string;
  embedProps?: EmbedProps;
}

const defaultEmbedProps: EmbedProps = {
  mode: "viz",
  panel: "code",
  showOriginalLink: 1,
  readOnly: 1,
  pan: 0,
  zoom: 0,
  controls: 0,
};

export const Viz: React.FC<VizProps> = ({ id, embedProps = {} }) => {
  const embedUrl = useMemo(() => {
    const embedPropsWithDefaults = { ...defaultEmbedProps, ...embedProps };
    const url = new URL(`https://stately.ai/viz/embed/${id}`);
    Object.keys(embedPropsWithDefaults).forEach((prop) => {
      url.searchParams.set(prop, embedPropsWithDefaults[prop]);
    });
    return url.toString();
  }, [id, embedProps]);

  return (
    <iframe
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

export namespace HistoryData {
  interface Entry {
    header: string;
    title: string;
    titleUrl: string;
    description?: string;
    time: string;
    products: string[];
    details?: Detail[];
    activityControls: string[];
    subtitles?: Subtitle[];
  }

  interface Subtitle {
    name: string;
    url: string;
  }

  interface Detail {
    name: string;
  }
}

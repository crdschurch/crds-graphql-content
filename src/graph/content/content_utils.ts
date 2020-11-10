import moment from "moment";
import removeMd from "remove-markdown";
import webvtt from "node-webvtt";
import request from "sync-request";

export class ContentUtils {
  public static formatDate(date): string {
    return moment(date).format("ll");
  }

  public static formatDuration(durationInSeconds): string {
    const duration = moment.duration(durationInSeconds, "seconds");
    const hours = duration.hours() ? `${duration.hours()} hr` : null;
    const minutes = duration.minutes() ? `${duration.minutes()} min` : null;
    const seconds = duration.seconds() ? `${duration.seconds()} sec` : null;
    return [hours, minutes, seconds].filter(Boolean).join(" ");
  }

  public static getImgixURL(imgurl): string {
    return imgurl.replace(
      `//images.ctfassets.net/${process.env.CONTENTFUL_SPACE_ID}/`,
      "https://crds-media.imgix.net/"
    );
  }

  public static removeMarkdown(markdown): string {
    return removeMd(markdown).trim();
  }

  public static sanitizeSubtitles(transcription): string {
    var vtt = request("GET", `https:${transcription.fields.file.url}`)
      .getBody()
      .toString();
    var rgx = new RegExp(/\[(.*?)\]/);

    try {
      var processedVTT = webvtt
        .parse(vtt, { meta: true })
        .cues.filter((s) => !s.text.match(rgx));
    } catch (error) {
      return `Error processing VTT contents: ${error.message}`;
    }

    try {
      return processedVTT.map((line) => line.text).join(" ");
    } catch (error) {
      return `Error compiling VTT contents: ${error.message}`;
    }
  }
}

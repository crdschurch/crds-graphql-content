import Content from "./content.base";
import { ContentUtils } from "../content_utils";
import { Types } from "../../../ioc/types";
import Series from "./series";
import container from "../../../ioc/inversify.config";
import { ContentConnector } from "../content.connector";

export default class Message extends Content {
    public duration: string;
    public date: string;
    protected series: Series;

    constructor(entry) {
        super(entry);

        var fields = entry.fields;
        this.duration = ContentUtils.formatDuration(fields.duration);
        this.date = ContentUtils.formatDate(fields.published_at);
    }

    public getQualifiedUrl(): Promise<string> {
        //check if we have already gotten series incase we had to for another field before. 
        if (this.series)
            return new Promise((resolve, reject) => {
                resolve(this.buildUrl());
            });

        return container.get<ContentConnector>(Types.ContentConnector)
            .getSeriesDataForMessages(this)
            .then((series: Series) => {
                this.series = series;
                return this.buildUrl();
            });
    }

    private buildUrl(): string | PromiseLike<string> {
        return `${process.env.CRDS_MEDIA_ENDPOINT}/series${this.series ? '/' + this.series.slug : ''}/${this.slug}`;
    }
}

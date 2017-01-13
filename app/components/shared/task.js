/**
 * Created by argaman on 1/7/2017.
 */

export function Task() {
    return {
        title: "",
        description: "",
        creationDate: new Date(),
        lastSubmissionDate: null,
        taskFile: null
    };
}
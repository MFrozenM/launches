import {LaunchModel} from "@/features/launches/launches.model";

export const _utc_to_local_time = (utcString: string): string => {
    const date = new Date(utcString);

    return date.toLocaleString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export const _filter_launches = (launches: LaunchModel[], search_term: string) => {
    if (!search_term) return launches;

    const normalized_search = search_term.toLowerCase();

    return launches.filter((launch) => {
        const mission_name = launch.mission_name?.toLowerCase() || "";
        const mission_id = String(launch.mission_id).toLowerCase();

        return mission_name.includes(normalized_search) || mission_id.includes(normalized_search);
    });
};


export interface LaunchesReturnedModel {
    launches: LaunchModel[]
}

export interface LaunchModel {
    mission_id: string
    mission_name: string
    launch_date_utc: string
    links: LinksModel
    details?: string
    rocket: RocketModel
    __typename: string
}

export interface LinksModel {
    flickr_images: string[]
    __typename: string
}

export interface RocketModel {
    fairings?: FairingsModel
    __typename: string
}

export interface FairingsModel {
    recovered?: boolean
    __typename: string
}

import type {Meta, StoryObj} from '@storybook/react';
import Launch from '@/components/launches/launch.component';
import '../styles/globals.css';
import Saturn from '../../public/saturn.jpg';

const meta = {
    title: 'Components/Launch',
    component: Launch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        launch_data: {
            mission_name: "SpaceX Falcon 9",
            mission_id: "5eb87d4effd86e00adca0604b388",
            details: "SpaceX's Falcon 9 rocket successfully launched the mission...",
            launch_date_utc: "2025-03-15T15:00:00Z",
            links: {
                flickr_images: [
                    "",
                ],
                __typename: ''
            },
            rocket: {
                fairings: {
                    recovered: true,
                    __typename: ''
                },
                __typename: ''
            },
            __typename: ''
        },
    }
} satisfies Meta<typeof Launch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        launch_data: {
            "mission_name": "SpaceX Falcon 9",
            "mission_id": "5eb87d4e2ffd86e000604b388",
            "details": "SpaceX's Falcon 9 rocket successfully launched the mission...",
            "launch_date_utc": "2025-03-15T15:00:00.000Z",

            "links": {
                // @ts-expect-error
                "flickr_images": [Saturn],
                "__typename": ""
            },

            "rocket": {
                "fairings": {
                    "recovered": true,
                    "__typename": ""
                },

                "__typename": ""
            },

            "__typename": ""
        },
    },
};


export const NoImage: Story = {
    args: {
        launch_data: {
            "mission_name": "SpaceX Falcon 9",
            "mission_id": "5eb87d4e2ffd86e000604b388",
            "details": "SpaceX's Falcon 9 rocket successfully launched the mission...",
            "launch_date_utc": "2025-03-15T15:00:00.000Z",

            "links": {
                "flickr_images": [""],
                "__typename": ""
            },

            "rocket": {
                "fairings": {
                    "recovered": true,
                    "__typename": ""
                },

                "__typename": ""
            },

            "__typename": ""
        },
    },
};
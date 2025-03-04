import React from "react";
import '../../styles/globals.css';
import Launch from "@/components/launches/launch.component";
import {LaunchModel} from "@/features/launches/launches.model";
import {mount} from "cypress/react";

describe("Launch Component", () => {
    const mockLaunchData: LaunchModel = {
        mission_id: "12345",
        mission_name: "Test Mission",
        launch_date_utc: "2024-06-15T12:00:00Z",
        links: {
            flickr_images: [''],
            __typename: "LinksModel",
        },
        details: "This is a test mission with important details.",
        rocket: {
            fairings: {recovered: true, __typename: "FairingsModel"},
            __typename: "RocketModel",
        },
        __typename: "LaunchModel",
    };

    beforeEach(() => {
        mount(<Launch launch_data={mockLaunchData}/>);
    });

    it("renders the mission name", () => {
        cy.contains("Test Mission").should("be.visible");
    });

    it("displays launch date", () => {
        cy.contains("Launch Date:").next().should("not.be.empty");
    });

    it("shows mission ID", () => {
        cy.contains("Mission ID:").next().should("contain", "12345");
    });

    it("toggles details on click", () => {
        cy.get("p").contains(mockLaunchData.details!).click();
        cy.get("p").contains(mockLaunchData.details!).should("have.class", "line-clamp-none");
    });

    it("displays fallback icon if no image is provided", () => {
        cy.get("svg").should("exist");
    });

    it("displays rocket icon if image is null", () => {
        const updatedLaunchData = {
            ...mockLaunchData,
            links: {flickr_images: [""], __typename: "LinksModel"},
        };

        mount(<Launch launch_data={updatedLaunchData}/>);
        cy.get("svg").should("exist");
    });
});

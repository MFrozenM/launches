
describe('Launches Page', () => {
    beforeEach(() => {
        cy.intercept('POST', '**/graphql', (req) => {
            if (req.body.operationName === 'Get_Launches_Query') {
                req.reply((res) => {
                    res.send({
                        data: {
                            launches: [
                                {
                                    mission_id: '1',
                                    mission_name: 'Apollo 11',
                                    launch_date_utc: '1969-07-16T13:32:00Z',
                                    links: {
                                        flickr_images: [''],
                                        __typename: 'Links'
                                    },
                                    details: 'First moon landing mission',
                                    rocket: {
                                        fairings: {
                                            recovered: true,
                                            __typename: 'Fairings'
                                        },
                                        __typename: 'Rocket'
                                    },
                                    __typename: 'Launch'
                                },
                                {
                                    mission_id: '2',
                                    mission_name: 'SpaceX Falcon 9',
                                    launch_date_utc: '2023-04-10T14:00:00Z',
                                    links: {
                                        flickr_images: [''],
                                        __typename: 'Links'
                                    },
                                    details: 'Latest SpaceX mission',
                                    rocket: {
                                        fairings: {
                                            recovered: false,
                                            __typename: 'Fairings'
                                        },
                                        __typename: 'Rocket'
                                    },
                                    __typename: 'Launch'
                                }
                            ]
                        }
                    });
                });
            }
        });

        cy.visit('http://localhost:3000/' + 'launches');
    });

    it('make sure the search bar will return the correct result', () => {
        cy.get('ul').should('be.visible').within(() => {
            cy.contains('Apollo 11').should('exist');
            cy.contains('SpaceX Falcon 9').should('exist');
        });

        cy.wait(5000);

        cy.get('input[placeholder="Search..."]').type('Apollo');

        cy.get('ul').within(() => {
            cy.contains('Apollo 11').should('exist');
            cy.contains('SpaceX Falcon 9').should('not.exist');
        });
    });
});

import {gql} from "@apollo/client";

export const GET_LAUNCHES = gql`
query Get_Launches_Query($limit: Int, $offset: Int) {
  launches(limit: $limit, offset: $offset) {
    mission_id
    mission_name
    launch_date_utc
    links {
      flickr_images
    }
    details
    rocket {
      fairings {
        recovered
      }
    }
  }
}
`;

// export const FIND_LAUNCHES = gql`
// query Get_Launches_Query(mission_name: "LaunchFind") {
//   launches {
//     mission_name
//     launch_date_utc
//     links {
//       flickr_images
//     }
//     details
//     rocket {
//       fairings {
//         recovered
//       }
//     }
//   }
// }
// `;



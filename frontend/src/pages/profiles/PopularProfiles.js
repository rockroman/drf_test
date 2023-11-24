import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../context/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles.</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;

// import { Container } from "react-bootstrap";
// import styles from "../../App.module.css";
// import appStyles from "../../App.module.css";
// import { useEffect, useState } from "react";
// import { axiosReq } from "../../api/axiosDefaults";
// import { useCurrentUser } from "../../context/CurrentUserContext";
// import Asset from "../../components/Asset";
// import Profile from "./Profile";
// import {
//   useIsLoadedContext,
//   useProfileDataCntxt,
// } from "../../context/ProfileDataContext";
// const PopularProfiles = ({ mobile }) => {
//   const isLoaded = useIsLoadedContext();
//   // const isLoaded = true;

//   const { popularProfiles } = useProfileDataCntxt();

//   return (
//     <Container
//       className={`${appStyles.Content} ${
//         mobile && "d-lg-none text-center mb-3"
//       } `}
//     >
//       {isLoaded ? (
//         popularProfiles.results.length ? (
//           <>
//             <p>Most followed profiles</p>
//             {mobile ? (
//               <div className="d-flex justify-content-around">
//                 {popularProfiles.results.slice(0, 4).map((profile) => {
//                   return <Profile key={profile.id} profile={profile} mobile />;
//                 })}
//               </div>
//             ) : (
//               popularProfiles.results.map((profile) => {
//                 return <Profile key={profile.id} profile={profile} />;
//               })
//             )}
//           </>
//         ) : (
//           <p>No profiles to display</p>
//         )
//       ) : (
//         <Asset spinner />
//       )}
//     </Container>
//   );
// };
// export default PopularProfiles;

import React, { useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker, Layer, Feature, Cluster } from "react-mapbox-gl";
import Tooltip from "@material-ui/core/Tooltip";
import "./clientsRegion.scss";
import Loader from "react-loader-spinner";
import "mapbox-gl/dist/mapbox-gl.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
const Map = ReactMapboxGl({
  accessToken:
    process.env.REACT_APP_MAP_BOX_KEY,
});

function MapFreelancer(props) {
  const [loading, setLoading] = useState(false);
  const clusterMarker = (coordinates, number) => (
    <Marker coordinates={coordinates}>
      <div className="marker-box">{number}</div>
    </Marker>
  );

  React.useState(() => {
    setTimeout(() => {
      setLoading(true);
    }, 9000);
  }, []);
  console.log(props.freelancers,"props.freelancers")
  return (
    <div className="map-page-freelancer">
      <Map
        style="mapbox://styles/mapbox/streets-v8"
        center={[props.savedLocation[1], props.savedLocation[0]]}
        zoom={[11]}
        containerStyle={{
          height: "100vh",
        }}
        renderChildrenInPortal={true}
      >
        {/* fa fa-map-marker */}

        <Marker
          key="8"
          coordinates={[props.savedLocation[1], props.savedLocation[0]]}
        >
          <div className="marker-box-icon">
            <BootstrapTooltip
              PopperProps={{
                disablePortal: true,
              }}
              arrow
              placement="top"
              title={"Current...Location"}
            >
              <i title={"Current_Location"} className="fa fa-map-marker"></i>
            </BootstrapTooltip>
            {loading ? <div className="marker-bottom"></div> : ""}

            <Loader
              type="Rings"
              color="#4b7902"
              height={100}
              width={100}
              timeout={6000}
              style={{
                marginTop: "-50px",
                zIndex: "2",
                position: "absolute",
                top: "30px",
                left: "-42px",
                transform: "rotate(90deg)",
              }}
            />
          </div>
        </Marker>
        
{props.freelancers && props.freelancers.length>0 &&
        <Cluster ClusterMarkerFactory={clusterMarker}>

          {
            props.freelancers && props.freelancers.length>0 && props.freelancers.map((item)=>{
              // console.log([item.location?.split(',')[1],item.location?.split(',')[0]],"item")
              return    <Marker
              coordinates={[item.location?.split(',')[1],item.location?.split(',')[0]]}
              anchor="bottom"
            >
              {" "}
              <BootstrapTooltip
                PopperProps={{
                  disablePortal: true,
                }}
                arrow
                placement="top"
                title={`${item.userName}(${item.userTitle})`}
              >
                <div className="marker-box">1</div>
              </BootstrapTooltip>
            </Marker>
            })
          }
        </Cluster>}
      </Map>
    </div>
  );
}

export default MapFreelancer;

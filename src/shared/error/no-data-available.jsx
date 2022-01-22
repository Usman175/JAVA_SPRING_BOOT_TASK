import React from 'react';

class NoDataAvailable extends React.Component {
    render() {
        return (
            <div className="d-flex no-data-container">
                <center>
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/noData.svg"} alt="no-data" style={{ width: '120px', marginBottom: '10px' }}/>
                    <p>Sorry! No Record Found</p>
                </center>
            </div>
        );
    }
}

export default NoDataAvailable;
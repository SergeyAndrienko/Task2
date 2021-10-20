import React from 'react';
import PropTypes from 'prop-types';
import classes from './DisplayingPictures.module.css'

class DisplayingPictures extends React.Component {
    render() {
        let imagesList;
        const {images} = this.props;
        if (images) {
            imagesList = (<div className={classes.wrap}>
                {images.map(img => (
                    <div className={classes.pictures}>
                    <img src={img.largeImageURL}/>
                    </div>
                ))}
            </div>)
        } else imagesList = null;
        return <div >
            {imagesList}
        </div>
    }
};

DisplayingPictures.propTypes = {
    images: PropTypes.array.isRequired
}
export default DisplayingPictures;
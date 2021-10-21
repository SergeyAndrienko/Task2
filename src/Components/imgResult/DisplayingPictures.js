import React from 'react';
import PropTypes from 'prop-types';
import classes from './DisplayingPictures.module.css'
import { GridList, GridTile } from 'material-ui/GridList';

import Dialog from 'material-ui/Dialog';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class DisplayingPictures extends React.Component {
    state = {
        open: false,
        currentImg: ''
    };

    handleOpen = img => {
        this.setState({ open: true, currentImg: img });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        let imagesList;
        const {images} = this.props;
        if (images) {
            imagesList = (
                <GridList className={classes.wrap} cols={3}>
                    {images.map(img => (
                        <GridTile key={img.id}>
                            <img src={img.largeImageURL} onClick={() => this.handleOpen(img.largeImageURL)} alt="" />
                        </GridTile>
                    ))}
                </GridList>
            );
        } else {
            imagesList = null;
        }

        return <div>
            <MuiThemeProvider>
            {imagesList}
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
                </Dialog>
            </MuiThemeProvider>
        </div>
    }
};

DisplayingPictures.propTypes = {
    images: PropTypes.array.isRequired
}
export default DisplayingPictures;
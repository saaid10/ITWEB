/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import Logger from 'jet-logger';


try {
    // Remove current build
    fs.removeSync('./dist/');
    // Copy front-end files
    fs.copySync('../Frontend/dist/Frontend', './dist/Build');
} catch (err) {
    Logger.Err(err);
}

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny Replace translation hash.
 *
 * @module      tiny_translations/modal
 * @copyright   2023 Rajneel Totaram <rjnlfj@yahoo.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Modal from 'tiny_translations/modal';
import ModalEvents from 'core/modal_events';
import ModalFactory from 'core/modal_factory';
import {getUnusedHash} from './options';

export const handleAction = (editor) => {
    displayDialogue(editor);
};

/**
 * Get the template context for the dialogue.
 *
 * @param {Editor} editor
 * @param {object} data
 * @returns {object} data
 */
const getTemplateContext = (editor, data) => {
    return Object.assign({}, {
        elementid: editor.id,
    }, data);
};


const displayDialogue = async(editor, data = {}) => {
    const modal = await ModalFactory.create({
        type: Modal.TYPE,
        templateContext: getTemplateContext(editor, data),
        large: true,
    });
    modal.show();

    const $root = modal.getRoot();
    $root.on(ModalEvents.save, (event, modal) => {
        handleOK(editor, modal, data);
    });
};

const handleOK = async(editor, modal, data) => {
    replaceHash(editor, modal, data);
};

const replaceHash = (editor, modal, data) => {
    const alltranslationhashpregex = /<p><span name="translationhash" data-translationhash[ ]*=[ ]*[\'"]+([a-zA-Z0-9]+)[\'"]+[ ]*>[ ]*<\/span><\/p>/g;
    const alltranslationhashregex = /<span name="translationhash" data-translationhash[ ]*=[ ]*[\'"]+([a-zA-Z0-9]+)[\'"]+[ ]*>[ ]*<\/span>/g;

    var translationhash;

    var initialcontent = editor.getContent();

    // Remove the old translation span tags.
    // Replace this so that it doesn't leave behind <p>&nbsp;</p>.
    initialcontent = initialcontent.replaceAll(alltranslationhashpregex, "");
    // Now replace all other instances.
    initialcontent = initialcontent.replaceAll(alltranslationhashregex, "");

    // Add new translation span tag.
    translationhash = "<p><span name=\"translationhash\" data-translationhash=\"" + getUnusedHash(editor) + "\"></span></p>";
    editor.setContent(initialcontent + translationhash);
    //editor.insertContent(translationhash + initialcontent);

    // Disable button.

};

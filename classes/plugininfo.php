<?php
// This file is part of Moodle - https://moodle.org/
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
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Tiny Translations plugin for Moodle.
 *
 * @package     tiny_translations
 * @copyright   2023 Andrew Lyons <andrew@nicols.co.uk>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_translations;

use context;
use editor_tiny\plugin;
use editor_tiny\plugin_with_configuration;

class plugininfo extends plugin implements plugin_with_configuration {
    public static function get_plugin_configuration_for_context(
        context $context,
        array $options,
        array $fpoptions,
        ?\editor_tiny\editor $editor = null
    ): array {
        $unusedhash = md5(random_string(32));

        // Do our best to make sure it's unique.
        /*
        while (!empty(translation::get_record(['md5key' => $unusedhash])) || !empty(translation::get_record(['lastgeneratedhash' => $unusedhash]))) {
            $unusedhash = md5(random_string(32));
        }
        */


        return [
            'unusedHash' => $unusedhash,
        ];
    }
}

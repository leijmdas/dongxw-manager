/**
 * Created by ljming on 2016/6/23.
 */
import Vue from 'vue';
import vTable from './v-table.vue'
import vToolbar from './v-toolbar.vue'
import vDialog from './v-dialog.vue'
import vImageUploader from './v-image-uploader.vue'
import vImagePreview from './v-image-preview.vue'
import vImagePreviewPkg from './v-image-preview-pkg.vue'
import VSortTable from './v-sort-table.vue'

Vue.component('v-table', vTable);
Vue.component('v-toolbar', vToolbar);
Vue.component('v-dialog', vDialog);
Vue.component('v-image-uploader', vImageUploader);
Vue.component('v-image-preview', vImagePreview);
Vue.component('v-image-preview-pkg', vImagePreviewPkg);
Vue.component('v-sort-table', VSortTable);

export {
    vTable,
    VSortTable,
    vToolbar,
    vDialog,
    vImageUploader,
    vImagePreview
}

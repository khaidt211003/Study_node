const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoID: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

//Custom query helpers

CourseSchema.query.sortable = function (req){
    if(req.query.hasOwnProperty('_sort')){
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        const type = isValidType ? req.query.type : 'asc'; // Kiểm tra tính hợp lệ của type ở đây
        return  this.sort({
            [req.query.column]: type,
        });
    }
    return this;
}

// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
'use strict';

angular.module('bodhiStudentAui')
.value('Cities', ['南京', '扬州', '淮南', '合肥', '凤台','芜湖'])
.value('AllCities', ['所有','南京', '扬州', '淮南', '合肥', '凤台','芜湖'])
.value('GradeTypes',['同喜', '同修', '同德'])
.value('Genders',[{lbl:'男',val:1},{lbl:'女',val:0}])
.value('States',[{lbl:'正常',val:0},{lbl:'休学',val:1},{lbl:'退学',val:2}])
.value('Educations',['博士以上','硕士','本科','大专','高中','初中','小学以下'])
.value('CourseCategories',['同喜班','同修班V1','同修班V2'])
.value('CheckinCategories',['现场','网络','心得','补课','公差','旷课'])
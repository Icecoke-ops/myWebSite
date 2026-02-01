import $ from 'jquery';
import { GlobalConfig } from './Config';
import { urlEncode } from './Utils';



export const GetArticale = (articalePath, onSuccess, onError) => {
    function processImage(content) {
        let res = content.replace(/(!\[.*?\]\()(.+?)(\))/g, (match, p1, p2, p3) => {
            if (p2.startsWith('http') || p2.startsWith('//')) {
                return match;
            }
            const separator = p2.startsWith('/') ? '' : '/';
            return `${p1}${GlobalConfig['apiDomain']}${separator}${p2}${p3}`;
        })
        onSuccess(res)
    }
    $.ajax({
        url: GlobalConfig['apiDomain'] + urlEncode(articalePath),
        type: 'GET',
        data: { 'parse': false },
        success: processImage,
        error: onError
    });
};

export const GetList = (path, onSuccess, onError) => {
    $.ajax({
        url: GlobalConfig['artListDomain'],
        type: 'GET',
        data: { 'path': path },
        success: onSuccess,
        error: onError
    });
}
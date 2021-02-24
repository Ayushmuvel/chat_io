exports.login = (req, res, next) => {
    //console.log(req.body)
    if (req.body.name != '' && req.body.group_name != '') {
        id_name = req.body.name
        id_group = req.body.group_name
    }
    res.render('v1/public/html/chat_page.html', { name: id_name, group_name: id_group });
}
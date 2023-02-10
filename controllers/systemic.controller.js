const sha1 = require('sha1');

class SystemicController{
    async uploadFiles(req, res){
        try{
            let file = req.files.image;
      
            let link = "/" + sha1(new Date() + " | " + Math.random()) + "." + file.name.split(".").pop();
      
            file.mv("./public" + link);
      
            return res.json({
              "status": "Success",
              "link": link
            })
      
        } catch (error) {
            return res.json({
              'status': 'Error',
              'code': -3
            });
        }
    }

}

module.exports = new SystemicController();
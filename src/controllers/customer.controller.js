// functions ที่ทำงานตาม route
exports.get = (req,res)=>{
    res.send("Get customers here");
}
exports.getById =(req, res)=>{
    res.send("Get customers " + req.params.id);
}

exports.getByName =(req, res)=>{
    res.send("Get customers name " + req.params.name);
}

exports.create = (req, res)=>{
    res.send("Create a customer");
  }

exports.put = (req, res)=>{
    res.send("Put a customer" + req.params.id);
  }

exports.patch = (req, res)=>{
    res.send("Patch a customer" + req.params.id);
  }

  exports.delete = (req, res)=>{
    res.send("Delete a customer" + req.params.id);
  }
jQuery.fn.refresh = function() {
    var s = skrollr.get();
 
    if(s) {
        s.refresh(this);
    }
 
    return this;
};
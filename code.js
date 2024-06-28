AFRAME.registerComponent("comics-poster",{
    init:function(){
        this.posterContainer=this.el
        this.posters()
    },
    posters:function(){
     const posterRef=[{
        id:"SpiderMan",
        url:"./Posters/SpiderMan.jpg"
     },
    {
        id:"Hulk",
        url:"./Posters/Hulk.jpg"    
    },
    {
        id:"Thor",
        url:"./Posters/Thor.jpg"    
    },
    {
        id:"WonderWoman",
        url:"./Posters/WonderWoman.jpg"},]  
    
        let prevoiusXPosition = -60;

    for (var item of posterRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl=this.createBorder(position,item.id)
      // Thumbnail Element
      const thumbnail=this.createThumbnail(item)
      // Title Text Element
      borderEl.appendChild(thumbnail)
      const titleEl=this.createTitle(position,item)
      borderEl.appendChild(titleEl)
      this.posterContainer.appendChild(borderEl);
    }},
    createBorder:function(position,id){
        const entityEl=document.createElement("a-entity")
        entityEl.setAttribute("id",id)
        entityEl.setAttribute("visible",true)
        entityEl.setAttribute("position",position)
        entityEl.setAttribute("geometry",{primitive:"plane", width:22, height:40})
        entityEl.setAttribute("material",{color:"blue",opacity:1})
        entityEl.setAttribute("cursor-listener",{})
        return entityEl
    
      },
      tick: function () {
        const { state } = this.el.getAttribute("page");
    
        if (state === "view") {
          this.hideEl([this.posterContainerContainer]);
          this.showView();
        }
      },
      hideEl: function (elList) {
        elList.comic(el => {
          el.setAttribute("visible", false);
        });
      },
    
      showView: function () {
        const { selectedCard } = this.data;
    
        //Set the 360 degree image to the sky element.
        const skyEl = document.querySelector("#main-container");
    
        skyEl.setAttribute("material", {
          src: `./${selectedCard}_pages/P1.jpg`,
          color: "white"
        });
      },
      createThumbnail:function(item){
        const entityEl=document.createElement("a-entity")
        entityEl.setAttribute("visible",true)
        entityEl.setAttribute("geometry",{primitive:"plane",width:19, height:28})
        entityEl.setAttribute("material",{src:item.url})
        entityEl.setAttribute("position",{x:0,y:5,z:1})
        return entityEl
      },
      createTitle:function(position,item){
        const entityEl=document.createElement("a-entity")
        entityEl.setAttribute("visible",true)
        entityEl.setAttribute("text",{
          font:"exo2bold", align:"center" , width:70 , color:"black", value:item.title
        })
        const pos=position
        pos.y=-20
        entityEl.setAttribute("position",pos)
        return entityEl
      }
})
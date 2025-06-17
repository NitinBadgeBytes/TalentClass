sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Label",
    "sap/ui/core/dnd/DragInfo",
    "sap/ui/core/dnd/DropInfo",
    "sap/ui/core/Fragment"
    
  
], (Controller, JSONModel,Label,DragInfo,DropInfo,Fragment) => {
    "use strict";

    return Controller.extend("talent.talentclass.controller.View1", {
        onInit() {

          const oData = {
            list1: [{ name: "Ava Johnston" },{name: "Alison Mahon"}],
            list2: [{ name: "Steve Cohen" },{ name: "Ben Shevin" }],
            list3: [{ name: "Perry John" }],
            list4: [{ name: "Faith Marshall" }],
            list5: [{ name: "Emma Dorn" }]
            
        };
        const oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
            
            // In your controller
            
          // const oView = this.getView();

          // // People and their starting positions
          // const aPeople = [
          //   { name: "Ava Johnston", boxId: "q1Box" },
          //   { name: "Steve Cohen", boxId: "q2Box" },
          //   { name: "Perry John", boxId: "q3Box" },
          //   { name: "Faith Marshall", boxId: "q4Box" }
          // ];
    
          // aPeople.forEach(person => {
          //   const oLabel = new Label({
          //     text: person.name,
          //     design: "Bold"
          //   });
    
          //   // Make the label draggable
          //   oLabel.addDragDropConfig(new DragInfo({
          //     groupName: "dragGroup"
          //   }));
    
          //   // Place it into the respective VBox
          //   const oBox = oView.byId(person.boxId);
          //   oBox.addItem(oLabel);
          // });
    
          // // Make all boxes droppable
          // ["q1Box", "q2Box", "q3Box", "q4Box", "q5Box"].forEach(boxId => {
          //   const oBox = oView.byId(boxId);
          //   oBox.addDragDropConfig(new DropInfo({
          //     groupName: "dragGroup",
          //     drop: this.onDrop.bind(this)
          //   }));
          // });
        },
        onDrop: function (oEvent) {
          const oDraggedItem = oEvent.getParameter("draggedControl");
          const sDraggedName = oDraggedItem.getTitle();
          const oSourceList = oDraggedItem.getParent();

          const oDropInfo = oEvent.getSource();
          const oTargetList = oDropInfo.getParent();

          if (!oTargetList || oSourceList === oTargetList) {
              return;
          }

          const oModel = this.getView().getModel();
          const oData = oModel.getData();

          // Get source and target list IDs
          const sSource = this._getListKey(oSourceList.getId());
          const sTarget = this._getListKey(oTargetList.getId());

          const iIndex = oData[sSource].findIndex(item => item.name === sDraggedName);
          if (iIndex !== -1) {
              const [movedItem] = oData[sSource].splice(iIndex, 1);
              oData[sTarget].push(movedItem);
              oModel.refresh();
          }
      },

      _getListKey: function (sId) {
          if (sId.includes("list1")) return "list1";
          if (sId.includes("list2")) return "list2";
          if (sId.includes("list3")) return "list3";
          if (sId.includes("list4")) return "list4";
          if (sId.includes("list5")) return "list5";
          if (sId.includes("list6")) return "list6";
          if (sId.includes("list7")) return "list7";
          if (sId.includes("list8")) return "list8";
          return "";
      },
      onPressList:function(){
        console.log("This is an alert message.");
      },
   
    //   onListItemPress: function (oEvent) {
    //     const oListItem = oEvent.getParameter("listItem");
    //     const oContext = oListItem.getBindingContext();
    //     const sName = oContext.getProperty("name");
    //     const sInitials = sName.split(" ").map(word => word[0]).join(""); // e.g., AJ
    
    //     // Create text if not already created
    //     if (!this._popoverText) {
    //         this._popoverText = new sap.m.Text({
    //             text: sName,
    //             // class: "sapUiSmallMarginBegin"
    //         }).addStyleClass("popoverTextMargin");;
    //     } else {
    //         this._popoverText.setText(sName);
    //     }
    
    //     // Create avatar if not already created
    //     if (!this._popoverAvatar) {
    //         this._popoverAvatar = new sap.f.Avatar({
    //             displayShape: "Circle",
    //             displaySize: "S",
    //             initials: sInitials,
    //             backgroundColor: sap.f.AvatarColor.Accent6
    //         });
    //     } else {
    //         this._popoverAvatar.setInitials(sInitials);
    //     }
    
    //     // Create popover only once
    //     if (!this._oPopover) {
    //         this._oPopover = new sap.m.Popover({
    //             content: new sap.m.HBox({
    //                 alignItems: "Start",
    //                 justifyContent: "Start",
    //                 items: [
    //                     this._popoverAvatar,
    //                     this._popoverText
    //                 ]
    //             }).addStyleClass("sapUiTinyMargin"),
    //             placement: sap.m.PlacementType.Right,
    //             showHeader: false
    //         });
    //     }
    
    //     this._oPopover.openBy(oListItem);
    // }
    onListItemPress :function(oEvent){
        var oButton = oEvent.getSource(),
        oView = this.getView();

    // create popover
    if (!this._pPopover) {
        this._pPopover = Fragment.load({
            id: oView.getId(),
            name: "talent.talentclass.view.popover",
            controller: this
        }).then(function(oPopover){
            oView.addDependent(oPopover);
            return oPopover;
        });
    }

    this._pPopover.then(function(oPopover){
        oPopover.openBy(oButton);
    });
    }
    
      
      

          
          
      
      
        
        
    });
});
import React, { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { saveAs } from "file-saver";



const App = () => {
  const [state, stateSetValue] = useState({
    compl: [
      {
        id: 0,
        name: "",
        count: 0,
        det: [
          {
            id: 0,
            name: "",
            det1: 0,
            det2: 0,
            det3: 0,
            det4: 0,
            det5: 0,
            det6: 0,
            det7: 0,
            det8: 0,
            det9: 0,
            det10: 0,
            det11: 0,
            det12: 0,
            det13: 0,
            det14: 0,
            det15: 0,
          }
        ]
      }
    ],
    general_det: [
      {
        id: 0,
        name: "",
        det1: 0,
        det2: 0,
        det3: 0,
        det4: 0,
        det5: 0,
        det6: 0,
        det7: 0,
        det8: 0,
        det9: 0,
        det10: 0,
        det11: 0,
        det12: 0,
        det13: 0,
        det14: 0,
        det15: 0,
      }
    ]
  })

  function minDet(det1,det2,det3,det4,det5,det6,det7,det8,det9,det10,det11,det12,det13,det14,det15){
    let min = 0
    if(det1!==0){
      min =det1
    } else if(det2!==0){
      min =det2
    }else if(det3!==0){
      min =det3
    }else if(det4!==0){
      min =det4
    }else if(det5!==0){
      min =det5
    }else if(det6!==0){
      min =det6
    }else if(det7!==0){
      min =det7
    }else if(det8!==0){
      min =det8
    }else if(det9!==0){
      min =det9
    }else if(det10!==0){
      min =det10
    }else if(det11!==0){
      min =det11
    }else if(det12!==0){
      min =det12
    }else if(det13!==0){
      min =det13
    }else if(det14!==0){
      min =det14
    }else if(det15!==0){
      min =det15
    }
    if( det1 < min && det1!==0){
      min = det1
    }else if( det2 < min && det2!==0){
      min = det2
    }else if( det3 < min && det3!==0){
      min = det3
    }else if( det4 < min && det4!==0){
      min = det4
    }else if( det5 < min && det5!==0){
      min = det5
    }else if( det6 < min && det6!==0){
      min = det6
    }else if( det7 < min && det7!==0){
      min = det7
    }else if( det8 < min && det8!==0){
      min = det8
    }else if( det9 < min && det9!==0){
      min = det9
    }else if( det10 < min && det10!==0){
      min = det10
    }else if( det11 < min && det11!==0){
      min = det11
    }else if( det12 < min && det12!==0){
      min = det12
    }else if( det13 < min && det13!==0){
      min = det13
    }else if( det14 < min && det14!==0){
      min = det14
    }else if( det15 < min && det15!==0){
      min = det15
    }
    return min
  }





  function tableToExcel() {
    let obj = {...state}
    let res = []
    state.compl.forEach(element => {
      let dets = []
      element.det.forEach(det => {
        dets.push({isGeneral: false, id: det.id, name: det.name, lots:[]})
      });
      state.general_det.forEach(det => {
        dets.push({isGeneral: true, id: det.id, name: det.name, lots:[]})
      });
      res.push({id: element.id, name: element.name, count: element.count, det: dets})
    });


    res.forEach(element => {
      let compl = null
      obj.compl.forEach(c => {
        if(c.id === element.id) compl = c
      })
      
      let remainder = 0; //найти сумму на других комплектах
      obj.compl.forEach(c => {
        if(c.id !== element.id) remainder += c.count
      })

      let min = 1000000
      while(min !== 0){  
        min = 1000000
        element.det.forEach(det => {
          if(!det.isGeneral){
            compl.det.forEach((d)=>{
              if(det.id === d.id){
                let MathMin = minDet(Number(d.det1),Number(d.det2), Number(d.det3), Number(d.det4), Number(d.det5), Number(d.det6), Number(d.det7), Number(d.det8), Number(d.det9), Number(d.det10), Number(d.det11), Number(d.det12), Number(d.det13), Number(d.det14), Number(d.det15))

                if(MathMin<min){
                  min = MathMin
                }
              }
            })
          }else{
            obj.general_det.forEach((d)=>{
              if(det.id === d.id){
                let MathMin = minDet(Number(d.det1),Number(d.det2), Number(d.det3), Number(d.det4), Number(d.det5), Number(d.det6), Number(d.det7), Number(d.det8), Number(d.det9), Number(d.det10), Number(d.det11), Number(d.det12), Number(d.det13), Number(d.det14), Number(d.det15))

                if(MathMin<min || min===0){
                  min = MathMin
                }
              }
            })
          }
        });

        if((compl.count) < min){
          min = compl.count
        }

        if(compl.count <= 0) min = 0
 
        if(min === 0 ) break
        element.count -= min

        console.log(min)

        element.det.forEach(det => {
          if(!det.isGeneral){
            compl.det.forEach((d)=>{
              if(det.id === d.id){
                let MathMin = minDet(Number(d.det1),Number(d.det2), Number(d.det3), Number(d.det4), Number(d.det5), Number(d.det6), Number(d.det7), Number(d.det8), Number(d.det9), Number(d.det10), Number(d.det11), Number(d.det12), Number(d.det13), Number(d.det14), Number(d.det15))
                if(Number(d.det1)!==0 && Number(d.det1)=== MathMin  ){
                  d.det1 = Number(d.det1) - min
                  det.lots.push(min)
                } else if(Number(d.det2)!=0 && Number(d.det2)=== MathMin ){
                  d.det2 = Number(d.det2) - min
                  det.lots.push(min)
                }else if(Number(d.det3)!=0  && Number(d.det3)=== MathMin  ){
                  d.det3 = Number(d.det3) - min
                  det.lots.push(min)
                }else if(Number(d.det4)!=0  && Number(d.det4)=== MathMin  ){
                  d.det4 = Number(d.det4) - min
                  det.lots.push(min)
                }else if(Number(d.det5)!=0 && Number(d.det5)=== MathMin  ){
                  d.det5 = Number(d.det5) - min
                  det.lots.push(min)
                }else if(Number(d.det6)!=0 && Number(d.det6)=== MathMin  ){
                  d.det6 = Number(d.det6) - min
                  det.lots.push(min)
                }else if(Number(d.det7)!=0 && Number(d.det7)=== MathMin  ){
                  d.det7 = Number(d.det7) - min
                  det.lots.push(min)
                }else if(Number(d.det8)!=0 && Number(d.det8)=== MathMin  ){
                  d.det8 = Number(d.det8) - min
                  det.lots.push(min)
                }else if(Number(d.det9)!=0 && Number(d.det9)=== MathMin ){
                 d.det9 = Number(d.det9) - min
                 det.lots.push(min)
                }else if(Number(d.det10)!=0 && Number(d.det10)=== MathMin  ){
                  d.det10 = Number(d.det10) - min
                  det.lots.push(min)
                }else if(Number(d.det11)!=0 && Number(d.det11)=== MathMin ){
                  d.det11 = Number(d.det11) - min
                  det.lots.push(min)
                }else if(Number(d.det12)!=0 && Number(d.det12)=== MathMin  ){
                  d.det12 = Number(d.det12) - min
                  det.lots.push(min)
                }else if(Number(d.det13)!=0 && Number(d.det13)=== MathMin ){
                  d.det13 = Number(d.det13) - min
                  det.lots.push(min)
                }else if(Number(d.det14)!=0 && Number(d.det14)=== MathMin  ){
                 d.det14 = Number(d.det14) - min
                 det.lots.push(min)
                }else if(Number(d.det15)!=0 && Number(d.det15)=== MathMin ){
                  d.det15 = Number(d.det15) - min
                  det.lots.push(min)
                }
              }
            })
          }else{
            obj.general_det.forEach((d)=>{
              if(det.id === d.id){
                let MathMin = minDet(Number(d.det1),Number(d.det2), Number(d.det3), Number(d.det4), Number(d.det5), Number(d.det6), Number(d.det7), Number(d.det8), Number(d.det9), Number(d.det10), Number(d.det11), Number(d.det12), Number(d.det13), Number(d.det14), Number(d.det15))
                let sumGeneral = Number(d.det1)+Number(d.det2)+Number(d.det3)+Number(d.det4)+ Number(d.det5)+ Number(d.det6)+ Number(d.det7)+ Number(d.det8)+Number(d.det9)+ Number(d.det10)+ Number(d.det11)+ Number(d.det12)+ Number(d.det13)+ Number(d.det14)+ Number(d.det15)
                
                if(Number(d.det1)!=0 && Number(d.det1)=== MathMin){
                  d.det1 = Number(d.det1) - min
                  det.lots.push(min)
                } else if(Number(d.det2)!=0 && Number(d.det2)=== MathMin  ){
                  d.det2 = Number(d.det2) - min
                  det.lots.push(min)
                }else if(Number(d.det3)!=0  && Number(d.det3)=== MathMin ){
                  d.det3 = Number(d.det3) - min
                  det.lots.push(min)
                }else if(Number(d.det4)!=0  && Number(d.det4)=== MathMin ){
                  d.det4 = Number(d.det4) - min
                  det.lots.push(min)
                }else if(Number(d.det5)!=0 && Number(d.det5)=== MathMin  ){
                  d.det5 = Number(d.det5) - min
                  det.lots.push(min)
                }else if(Number(d.det6)!=0 && Number(d.det6)=== MathMin ){
                  d.det6 = Number(d.det6) - min
                  det.lots.push(min)
                }else if(Number(d.det7)!=0 && Number(d.det7)=== MathMin ){
                  d.det7 = Number(d.det7) - min
                  det.lots.push(min)
                }else if(Number(d.det8)!=0 && Number(d.det8)=== MathMin ){
                  d.det8 = Number(d.det8) - min
                  det.lots.push(min)
                }else if(Number(d.det9)!=0 && Number(d.det9)=== MathMin ){
                  d.det9 = Number(d.det9) - min
                  det.lots.push(min)
                }else if(Number(d.det10)!=0 && Number(d.det10)=== MathMin  ){
                  d.det10 = Number(d.det10) - min
                  det.lots.push(min)
                }else if(Number(d.det11)!=0 && Number(d.det11)=== MathMin ){
                  d.det11 = Number(d.det11) - min
                  det.lots.push(min)
                }else if(Number(d.det12)!=0 && Number(d.det12)=== MathMin  ){
                  d.det12 = Number(d.det12) - min
                  det.lots.push(min)
                }else if(Number(d.det13)!=0 && Number(d.det13)=== MathMin  ){
                  
                  d.det13 = Number(d.det13) - min
                  det.lots.push(min)
                
                }else if(Number(d.det14)!=0 && Number(d.det14)=== MathMin  ){
                  d.det14 = Number(d.det14) - min
                  det.lots.push(min)
                }else if(Number(d.det15)!=0 && Number(d.det15)=== MathMin  ){
                  d.det15 = Number(d.det15) - min
                  det.lots.push(min)
                }
              }
            })
          }
          console.log(obj.general_det)
        
        });
      
      }

    });

    let max = res[0].det[0].lots.length
    res.forEach(element => {
      element.det.forEach(det => {
        if(det.lots.length > max) max = det.lots.length
      });
    });

    console.log(max)
    let arr1 = ["Комплектация", "Комплектующие"]
      for (let index = 0; index < max; index++) {
        arr1.push("")
      }
    var data = [];
    data.push(arr1)

    res.forEach(item => {
      console.log(item)
      if(item.name !== ""){
        let arr2 = [item.name, ""]
        for (let index = 0; index < max; index++) {
          arr2.push("")
        }
        data.push(arr2)
        item.det.forEach(det => {
          let arr = ["", det.name]
          det.lots.forEach(lot => {
            arr.push(lot)
          });
          for (let index = 0; index < max - det.lots.length; index++) {
            arr.push("")
          }
          data.push(arr)
        })
        let arr3 = ["", ""]
        for (let index = 0; index < max; index++) {
          arr3.push("")
        }
        data.push(arr3)
      }
    })

    console.log(data)
    data = data.map(function(el){ 
      let arr4 = [el[0]]
      for (let index = 1; index <= max+1; index++) {
        arr4.push('"' + el[index] + '"')
      }
      return arr4.join(',') + "\r\n"; 
    });
    console.log(data)
    saveAs( new Blob( data, {type : 'text/csv'}), 'data.csv' );
	}

  return (
    <div className = "container mt-2" >
    <button onClick={()=>{
      let obj = {...state}
      let max = obj.compl[0].id
      obj.compl.forEach(e => {
        if(e.id > max) max = e.id
      });
      obj.compl.push(
      {
        id: max+1,
        name: "",
        det: [
          {
            id: 0,
            name: "",
            det1: null,
            det2: null,
            det3: null,
            det4: null,
            det5: null,
            det6: null,
            det7: null,
            det8: null,
            det9: null,
            det10: null,
            det11: null,
            det12: null,
            det13: null,
            det14: null,
            det15: null,
          }
        ]
      })
      stateSetValue(obj)
    }}>Добавить комплектацию</button> 
    <button onClick={()=>{
      stateSetValue({
        compl: [
          {
            id: 0,
            name: "",
            count: 0,
            det: [
              {
                id: 0,
                name: "",
                det1: 0,
                det2: 0,
                det3: 0,
                det4: 0,
                det5: 0,
                det6: 0,
                det7: 0,
                det8: 0,
                det9: 0,
                det10: 0,
                det11: 0,
                det12: 0,
                det13: 0,
                det14: 0,
                det15: 0,
              }
            ]
          }
        ],
        general_det: [
          {
            id: 0,
            name: "",
            det1: 0,
            det2: 0,
            det3: 0,
            det4: 0,
            det5: 0,
            det6: 0,
            det7: 0,
            det8: 0,
            det9: 0,
            det10: 0,
            det11: 0,
            det12: 0,
            det13: 0,
            det14: 0,
            det15: 0,
          }
        ]
      })
    }}>Очистить</button>
    <button onClick={()=>{
      tableToExcel()
    }}>Рассчитать</button>
    <table className="mt-1" style={{ overflowY: "auto" , maxHeight: "500px",  fontSize: "small" }} >
      <thead>
        <tr>
          <th> <div>Название комплектации/Количество</div> </th>
          <th> <div>Название детали/Партии</div> </th>
        </tr>
      </thead>
      <tbody>
        {
          state.compl.map((item)=>{
            return (
              <tr>
                <th style={{width: "320px"}} className="d-flex"> 
                <input  style={{width: "200px"}} id = {item.id} value = {item.name} onChange={(evt)=>{
                  let obj = {...state}
                  obj.compl.forEach(element => {
         
                    if(Number(element.id) === Number(evt.target.id)) element.name = evt.target.value
                  });
                  stateSetValue(obj)
                }}/> 
                <input  style={{width: "50px"}} type="number" id = {item.id} value = {item.count} onChange={(evt)=>{
                    let obj = {...state}
                    obj.compl.forEach(element => {

                      if(Number(element.id) === Number(evt.target.id)) element.count = evt.target.value
                    });
                    stateSetValue(obj)
                  }}/>
                <button onClick={()=>{
                  let obj = {...state}
                  let max = item.id
                  item.det.forEach(e => {
                    if(e.id > max) max = e.id
                  });
                  obj.compl.forEach(c => {
                    if(c.id === item.id){
                      c.det.push(
                        {
                          id: max+1,
                          name: "",
                          det1: null,
                          det2: null,
                          det3: null,
                          det4: null,
                          det5: null,
                          det6: null,
                          det7: null,
                          det8: null,
                          det9: null,
                          det10: null,
                          det11: null,
                          det12: null,
                          det13: null,
                          det14: null,
                          det15: null,
                        })
                      }
                  })
                  stateSetValue(obj)
                }}>Добавить</button> 
                </th> 
                <th> 
                  <table  style={{ overflowY: "auto" , maxHeight: "500px",  fontSize: "small" }} >
                    <tbody>
                      {item.det.map(det => {
                        return (
                          <tr>
                              <th><input style={{width: "200px"}} id = {det.id} value = {det.name} onChange={(evt)=>{
                                let obj = {...state}
                                obj.compl.forEach(element => {
                                  if(Number(element.id) === Number(item.id)){
                                    element.det.forEach((d)=>{
                                      if(Number(d.id) === Number(evt.target.id)) d.name = evt.target.value
                                    })
                                  }
                                });
                                stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id} value={det.det1} onChange={(evt)=>{ 
                                let obj = {...state}
                                obj.compl.forEach(element => {
                                  if(Number(element.id) === Number(item.id)){
                                    element.det.forEach((d)=>{
                                      if(Number(d.id) === Number(evt.target.id)) d.det1 = evt.target.value
                                    })
                                  }
                                });
                                stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id} value={det.det2}  onChange={(evt)=>{ 
                                let obj = {...state}
                                obj.compl.forEach(element => {
                                  if(Number(element.id) === Number(item.id)){
                                    element.det.forEach((d)=>{
                                      if(Number(d.id) === Number(evt.target.id)) d.det2 = evt.target.value
                                    })
                                  }
                                });
                                stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det3}  onChange={(evt)=>{ 
                                let obj = {...state}
                                obj.compl.forEach(element => {
                                  if(Number(element.id) === Number(item.id)){
                                    element.det.forEach((d)=>{
                                      if(Number(d.id) === Number(evt.target.id)) d.det3 = evt.target.value
                                    })
                                  }
                                });
                                stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det4}  onChange={(evt)=>{ 
                               let obj = {...state}
                               obj.compl.forEach(element => {
                                 if(Number(element.id) === Number(item.id)){
                                   element.det.forEach((d)=>{
                                     if(Number(d.id) === Number(evt.target.id)) d.det4 = evt.target.value
                                   })
                                 }
                               });
                               stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det5}  onChange={(evt)=>{ 
                                let obj = {...state}
                                obj.compl.forEach(element => {
                                  if(Number(element.id) === Number(item.id)){
                                    element.det.forEach((d)=>{
                                      if(Number(d.id) === Number(evt.target.id)) d.det5 = evt.target.value
                                    })
                                  }
                                });
                                stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det6}  onChange={(evt)=>{ 
                               let obj = {...state}
                               obj.compl.forEach(element => {
                                 if(Number(element.id) === Number(item.id)){
                                   element.det.forEach((d)=>{
                                     if(Number(d.id) === Number(evt.target.id)) d.det6 = evt.target.value
                                   })
                                 }
                               });
                               stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det7}  onChange={(evt)=>{ 
                                let obj = {...state}
                                obj.compl.forEach(element => {
                                  if(Number(element.id) === Number(item.id)){
                                    element.det.forEach((d)=>{
                                      if(Number(d.id) === Number(evt.target.id)) d.det7 = evt.target.value
                                    })
                                  }
                                });
                                stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det8}  onChange={(evt)=>{ 
                                let obj = {...state}
                                obj.compl.forEach(element => {
                                  if(Number(element.id) === Number(item.id)){
                                    element.det.forEach((d)=>{
                                      if(Number(d.id) === Number(evt.target.id)) d.det8 = evt.target.value
                                    })
                                  }
                                });
                                stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det9}  onChange={(evt)=>{ 
                               let obj = {...state}
                               obj.compl.forEach(element => {
                                 if(Number(element.id) === Number(item.id)){
                                   element.det.forEach((d)=>{
                                     if(Number(d.id) === Number(evt.target.id)) d.det9 = evt.target.value
                                   })
                                 }
                               });
                               stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det10} onChange={(evt)=>{ 
                              let obj = {...state}
                              obj.compl.forEach(element => {
                                if(Number(element.id) === Number(item.id)){
                                  element.det.forEach((d)=>{
                                    if(Number(d.id) === Number(evt.target.id)) d.det10 = evt.target.value
                                  })
                                }
                              });
                              stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det11}  onChange={(evt)=>{ 
                               let obj = {...state}
                               obj.compl.forEach(element => {
                                 if(Number(element.id) === Number(item.id)){
                                   element.det.forEach((d)=>{
                                     if(Number(d.id) === Number(evt.target.id)) d.det11 = evt.target.value
                                   })
                                 }
                               });
                               stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det12}  onChange={(evt)=>{ 
                               let obj = {...state}
                               obj.compl.forEach(element => {
                                 if(Number(element.id) === Number(item.id)){
                                   element.det.forEach((d)=>{
                                     if(Number(d.id) === Number(evt.target.id)) d.det12 = evt.target.value
                                   })
                                 }
                               });
                               stateSetValue(obj) 
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det13}  onChange={(evt)=>{ 
                               let obj = {...state}
                               obj.compl.forEach(element => {
                                 if(Number(element.id) === Number(item.id)){
                                   element.det.forEach((d)=>{
                                     if(Number(d.id) === Number(evt.target.id)) d.det13 = evt.target.value
                                   })
                                 }
                               });
                               stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det14}  onChange={(evt)=>{ 
                                let obj = {...state}
                                obj.compl.forEach(element => {
                                  if(Number(element.id) === Number(item.id)){
                                    element.det.forEach((d)=>{
                                      if(Number(d.id) === Number(evt.target.id)) d.det14 = evt.target.value
                                    })
                                  }
                                });
                                stateSetValue(obj)
                              }}/></th>
                              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det15}  onChange={(evt)=>{ 
                               let obj = {...state}
                               obj.compl.forEach(element => {
                                 if(Number(element.id) === Number(item.id)){
                                   element.det.forEach((d)=>{
                                     if(Number(d.id) === Number(evt.target.id)) d.det15 = evt.target.value
                                   })
                                 }
                               });
                               stateSetValue(obj)
                              }}/></th>
                          </tr>
                        )
                      })
                      }
                    </tbody>
                  </table>
                </th>
              </tr>
            )
          })
        }
        
      </tbody>
    </table>
    <button className="mt-2" onClick={ ()=>{
      let obj = {...state}
      let max = state.general_det[0].id
      state.general_det.forEach(e => {
        if(e.id > max) max = e.id
      });
      obj.general_det.push(
            {
              id: max+1,
              name: "",
              det1: 0,
              det2: 0,
              det3: 0,
              det4: 0,
              det5: 0,
              det6: 0,
              det7: 0,
              det8: 0,
              det9: 0,
              det10: 0,
              det11: 0,
              det12: 0,
              det13: 0,
              det14: 0,
              det15: 0,   
      })
      stateSetValue(obj)
    }}>Добавить</button>
    <table className="mt-1" style={{ overflowY: "auto" , maxHeight: "500px",  fontSize: "small" }} >
      <thead>
        <tr>
          <th> <div>Общие детали/ Партии</div> </th>
          <th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/><th/>
        </tr>
      </thead>
      <tbody>
        {state.general_det.map(det => {
          return (
            <tr>
              <th><input style={{width: "200px"}} id = {det.id} value = {det.name} onChange={(evt)=>{
                let obj = {...state}
                obj.general_det.forEach(element => {
                  if(Number(element.id) === Number(evt.target.id)) element.name = evt.target.value
                });
                stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id} value={det.det1} onChange={(evt)=>{ 
                let obj = {...state}
                obj.general_det.forEach(i =>{
                      if(Number(i.id) === Number(evt.target.id)) i.det1 = evt.target.value
                })
              stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id} value={det.det2}  onChange={(evt)=>{ 
                 let obj = {...state}
                 obj.general_det.forEach(i =>{
                       if(Number(i.id) === Number(evt.target.id)) i.det2 = evt.target.value
                 })
               stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det3}  onChange={(evt)=>{ 
                 let obj = {...state}
                 obj.general_det.forEach(i =>{
                       if(Number(i.id) === Number(evt.target.id)) i.det3 = evt.target.value
                 })
               stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det4}  onChange={(evt)=>{ 
                 let obj = {...state}
                 obj.general_det.forEach(i =>{
                       if(Number(i.id) === Number(evt.target.id)) i.det4 = evt.target.value
                 })
               stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det5}  onChange={(evt)=>{ 
                  let obj = {...state}
                  obj.general_det.forEach(i =>{
                        if(Number(i.id) === Number(evt.target.id)) i.det5 = evt.target.value
                  })
                stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det6}  onChange={(evt)=>{ 
              let obj = {...state}
              obj.general_det.forEach(i =>{
                    if(Number(i.id) === Number(evt.target.id)) i.det6 = evt.target.value
              })
            stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det7}  onChange={(evt)=>{ 
                 let obj = {...state}
                 obj.general_det.forEach(i =>{
                       if(Number(i.id) === Number(evt.target.id)) i.det7 = evt.target.value
                 })
               stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det8}  onChange={(evt)=>{ 
                 let obj = {...state}
                 obj.general_det.forEach(i =>{
                       if(Number(i.id) === Number(evt.target.id)) i.det8 = evt.target.value
                 })
               stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det9}  onChange={(evt)=>{ 
                 let obj = {...state}
                 obj.general_det.forEach(i =>{
                       if(Number(i.id) === Number(evt.target.id)) i.det9 = evt.target.value
                 })
               stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det10} onChange={(evt)=>{ 
                  let obj = {...state}
                  obj.general_det.forEach(i =>{
                        if(Number(i.id) === Number(evt.target.id)) i.det10 = evt.target.value
                  })
                stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det11}  onChange={(evt)=>{ 
                  let obj = {...state}
                  obj.general_det.forEach(i =>{
                        if(Number(i.id) === Number(evt.target.id)) i.det11 = evt.target.value
                  })
                stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det12}  onChange={(evt)=>{ 
                  let obj = {...state}
                  obj.general_det.forEach(i =>{
                        if(Number(i.id) === Number(evt.target.id)) i.det12 = evt.target.value
                  })
                stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det13}  onChange={(evt)=>{ 
                 let obj = {...state}
                 obj.general_det.forEach(i =>{
                       if(Number(i.id) === Number(evt.target.id)) i.det13 = evt.target.value
                 })
               stateSetValue(obj) 
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det14}  onChange={(evt)=>{ 
                 let obj = {...state}
                 obj.general_det.forEach(i =>{
                       if(Number(i.id) === Number(evt.target.id)) i.det14 = evt.target.value
                 })
               stateSetValue(obj)  
              }}/></th>
              <th><input type="number" style={{width: "50px"}} id = {det.id}  value={det.det15}  onChange={(evt)=>{ 
                  let obj = {...state}
                  obj.general_det.forEach(i =>{
                        if(Number(i.id) === Number(evt.target.id)) i.det15 = evt.target.value
                  })
                stateSetValue(obj) 
              }}/></th>

        </tr>
      )})}
      </tbody>
    </table>
    
    </div>
);
}

export default App;

ReactDOM.render(<App />, document.getElementById("react-root"));


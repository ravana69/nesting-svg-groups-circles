var prevG = stage,
		tl = gsap.timeline({paused:true})
	
function draw(n, rot, offset){	
	for (var i = 0; i < n; i++){
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g")
		prevG.appendChild(g)
		prevG = g
		
		var c = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    g.appendChild(c)

		gsap.set(g, {rotate:rot}) //rotate the current group
		
		gsap.fromTo(c, { //animate the color
			attr:{ stroke:'hsl('+(i/n*180+360)+',100%,50%)' }
		},{
			attr:{ stroke:'hsl('+(i/n*180)+',100%,50%)' },
			duration:6,
			ease:'none',
			repeat:-1
		})
		
		tl.add( //add the rest of the circle's animation to the main timeline
			gsap.fromTo(c, {
				attr:{
					class:'c',
					'stroke-width':2.5,
					cx:offset,
					cy:offset,
					r:200*i/n,
				}
			},{
				attr:{ 'stroke-width':6-i/n*5 },
				scale:0.05+0.1*i/n,
				ease:'expo.inOut', 
				duration:3,
			}), i/n
		)
	}
}

window.onload = window.onresize = ()=>{
	gsap.set(stage, {x:innerWidth/2, y:innerHeight/2})
}

window.onpointermove = (e)=>{
	gsap.to(tl, {
		duration:1,
		progress:gsap.utils.wrapYoyo(0,1,2*e.x/innerWidth)
	})
	// gsap.to('.c', {
	// 	attr:{ stroke:(i,t,a)=>'hsl('+(e.y/innerHeight*180-180*i/a.length)+',100%,50%)' }
	// })
}

draw(135, 9, 4)
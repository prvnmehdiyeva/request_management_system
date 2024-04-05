import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0,
      transform: 'translateY(-10%)', 
    }),
    animate('0.5s 0.5s ease-out', style({ 
      opacity: 1,
      transform: 'translateY(0)', 
    })),
  ]),
]);

export const fadeOpacityAnimation = trigger('fadeOpacityAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0,
      transform: 'translateX(-5%)', 
    }),
    animate('0.5s 0.5s ease-in', style({ 
      opacity: 1,
      transform: 'translateX(0)', 
    })),
  ]),
]);

export const fadeDelayedAnimation = trigger('fadeDelayedAnimation', [
  transition(':enter', [
    style({
      opacity: 0, 
      display: 'none',
      transform: 'translateY(5%)', 

    }),
    animate('0.5s ease-in', style({
      opacity: 1,
      display: 'block',
      transform: 'translateY(0)', 

    })),
  ], { delay: '1.5s' }), 
]);

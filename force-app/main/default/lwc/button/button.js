import { LightningElement , api} from 'lwc';

export default class Button extends LightningElement {

    @api icon;
    @api label;
    handleButton(event) {
      this.dispatchEvent(new CustomEvent('buttonclick',{
         bubbles: true
      }));
    }
}
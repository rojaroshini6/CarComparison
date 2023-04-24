<template>
  <div class="top-wrapper">
    <div class="details-section">
      <div v-if="Object.keys(details).length != 0">
        <h3>{{ details.merk }}</h3>
        <img
          src="https://tesla-cdn.thron.com/delivery/public/image/tesla/195458a0-ff67-488c-b972-14d23d2c42fb/bvlatuR/std/1200x630/ms-homepage-social"
        />
        <h3>Date of Manufacturing - {{ details.datum_eerste_toelating }}</h3>
      </div>
    </div>
    <Form class="form" @submit="onSubmit">
      <div class="form-section">
        <label for="licencePlate">Licence Plate</label>
        <Field
          v-model="licencePlate"
          type="text"
          class="licencePlate input-bg"
          id="licencePlate"
          name="licencePlate"
          :rules="validateLicencePlate"
          @keypress="licencePlateKeydown($event)"
        />
        <ErrorMessage
          class="licencePlateError bg-error"
          name="licencePlate"
          data-test="licencePlateError"
        />
        <div>
          <button type="button" @click="fetchLicencePlate()" class="licencePlateBtn btn">
            Fetch
          </button>
        </div>
      </div>
      <!-- Zipcode -->
      <div class="form-section">
        <label for="zipcode">Zipcode</label>
        <Field
          class="zipcode input-bg"
          v-model="zipcode"
          type="text"
          id="zipcode"
          name="zipcode"
          :rules="validateZipcode"
          @keypress="zipcodeKeydown($event)"
        />
        <ErrorMessage name="zipcode" class="zipcodeError bg-error" />
      </div>
      <!-- Housenumber -->
      <div class="form-section">
        <label for="housenumber">House Number</label>
        <Field
          class="housenumber input-bg"
          v-model="housenumber"
          type="text"
          id="housenumber"
          name="housenumber"
          :rules="validateHousenumber"
          @keypress="housenumberKeydown($event)"
        />
        <ErrorMessage name="housenumber" class="housenumberError bg-error" />
      </div>

      <!-- Housenumber addition -->
      <div class="form-section">
        <label for="houseAddition">House Number Addition</label>
        <Field
          class="houseAddition input-bg"
          v-model="houseAddition"
          type="text"
          id="houseAddition"
          name="houseAddition"
          :rules="validatehouseAddition"
          @keypress="houseAdditionKeydown($event)"
        />
        <ErrorMessage name="houseAddition" class="houseAdditionError bg-error" />
      </div>

      <!-- birthdate -->
      <div class="form-section">
        <label for="birthdate">Birth Date</label>
        <Field
          class="birthdate input-bg"
          v-model="birthdate"
          type="text"
          id="birthdate"
          name="birthdate"
          placeholder="dd-mm-yyyy"
          :rules="validateBirthdate"
          @keypress="dobKeydown($event)"
        />
        <ErrorMessage name="birthdate" class="birthdateError bg-error" />
      </div>
      <!-- ClaimFree years -->

      <div class="form-section">
        <label for="claimFree">Claim Free years</label>
        <select v-model="claimFree" class="claimFree input-bg">
          <option value="0">0</option>
          <option v-for="i in claimFreeValues" :value="i" v-bind:key="i">
            {{ i }}
          </option>
        </select>
      </div>

      <!-- Kilometrage -->
      <div class="form-section">
        <label for="kilometrage">Kilometrage</label>
        <select v-model="selected" name="kilometrage" id="kilometrage" class="kilometrage input-bg">
          <option v-for="option in options" :value="option.value" v-bind:key="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <button type="submit" @click="send()" data-test="btn" class="btn">Vergelijken</button>
    </Form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";
import { Form, Field, ErrorMessage } from "vee-validate";
import { Component, Watch } from "vue-property-decorator";
import moment from "moment";
import withUUID from "vue-uuid";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
  },
})
export default class CarForm extends Vue {
  licencePlateValue = "";
  zipcodeValue = "";
  birthdateValue = "";
  momentValue = "";
  dob = false;
  claimFree = 0;
  claimFreeValues = 0;
  housenumberValue = "";
  houseAdditionValue = "";
  details = {};

  options = [
    { text: "0 t/m 7500 KM", value: "1" },
    { text: "7501 t/m 10000 KM", value: "2" },
    { text: "10001 t/m 12000 KM", value: "3" },
    { text: "12001 t/m 15000 KM", value: "4" },
    { text: "15000 t/m 20000 KM", value: "5" },
    { text: "20001 t/m 25000 KM", value: "6" },
    { text: "25001 t/m 30000 KM", value: "7" },
    { text: "30001 t/m 90000 KM", value: "8" },
  ];

  selectedValue = this.options[1].value;
  claimfreeDefault = 0;

  get selected() {
    return this.selectedValue;
  }

  set selected(value: string) {
    this.selectedValue = value;
  }

  send(e: any): void {
    const stringparam = `licencePlate=${this.licencePlateValue}&zipcode=${this.zipcodeValue}&birthdate=${this.birthdateValue}&claimFree=${this.claimFree}&housenumber=${this.housenumberValue}&houseAdditionValue=${this.houseAdditionValue}&Kilometrage=${this.selectedValue}`;
    const url = window.location.href;
    if (
      this.licencePlateValue != "" &&
      this.zipcodeValue != "" &&
      this.birthdateValue != "" &&
      this.housenumberValue != "" &&
      this.houseAdditionValue != ""
    ) {
      window.location.href = url + stringparam;
    }
  }
  onSubmit(values: any) {
    //alert(this.selectedValue);
    console.log(JSON.stringify(values, null, 6));
  }

  licencePlateKeydown(e: any) {
    if (/^\W$/.test(e.key)) {
      e.preventDefault();
    }
  }

  zipcodeKeydown(e: any) {
    if (/^\W$/.test(e.key)) {
      e.preventDefault();
    }
  }

  dobKeydown(e: any) {
    var s = /^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if (s.test(e.key)) {
      e.preventDefault();
    }
  }

  housenumberKeydown(e: any) {
    if (/[^0-9]/gi.test(e.key)) {
      e.preventDefault();
    }
  }

  houseAdditionKeydown(e: any) {
    if (/^\W$/.test(e.key)) {
      e.preventDefault();
    }
  }

  get licencePlate() {
    return this.licencePlateValue;
  }

  set licencePlate(value: string) {
    this.licencePlateValue = value.toUpperCase();
  }

  get zipcode() {
    return this.zipcodeValue;
  }

  set zipcode(value: string) {
    this.zipcodeValue = value.toUpperCase();
  }

  get birthdate() {
    return this.birthdateValue;
  }

  set birthdate(value: string) {
    this.birthdateValue = value;
  }

  get housenumber() {
    return this.housenumberValue;
  }

  set housenumber(value: string) {
    this.housenumberValue = value;
  }

  get houseAddition() {
    return this.houseAdditionValue;
  }

  set houseAddition(value: string) {
    this.houseAdditionValue = value;
  }

  validatehouseAddition(value: string) {
    // if the field is empty
    if (!value) {
      return "This field is required";
    }

    return true;
  }

  validateLicencePlate(value: string) {
    // if the field is empty
    if (!value) {
      return "This field is required";
    }
    return true;
  }

  async fetchLicencePlate() {
    let result = await axios
      .get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${this.licencePlateValue}`)
      .then((res) => {
        this.details = res.data[0];
      });
  }

  validateZipcode(value: string) {
    if (!value) {
      return "This field is required";
    }

    const regex = /^[A-Z]{4}[0-9]{2}$/;
    if (!regex.test(value.toString())) {
      return "Incorrect format, the field follows the format XXXX99 ";
    }

    return true;
  }
  validateHousenumber(value: string) {
    if (!value) {
      return "This field is required";
    }

    return true;
  }

  validateBirthdate(value: number) {
    this.claimFree = 0;
    if (!value) {
      return "This field is required";
    }

    const regex = /^([0-2^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/;
    // /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;
    if (!regex.test(value.toString())) {
      return "Incorrect date format, the field follows the format DD-MM-YYYY. ";
    }

    var years = moment().diff(value, "years", false);
    if (years > 100) {
      return "Age cannot be more than 100 years old. Input correctly.";
    } else {
      this.claimFree = moment().year() - moment(value, "DD-MM-YYYY").year() - 18;
      this.claimFreeValues = moment().year() - moment(value, "DD-MM-YYYY").year() - 18;
    }

    return true;
  }
  validateClaimFree(value: string) {
    if (!value) {
      return "This field is required";
    }

    return true;
  }
}
</script>

<style scoped>
.vd-form {
  width: 330px;
}

@media only screen and (max-width: 768px) {
  .vd-form {
    width: 100%;
  }
}

.form-section {
  margin-top: 10px;
}

.form-section label {
  margin-top: 10px;
}

.btn {
  background: #5fa8d3;
  text-align: center;
  padding: 10px 10px;
  font-weight: 600;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.1s ease;
  margin-top: 10px;
}

.btn:hover {
  background: #5fa8d8;
}

.form {
  width: 50%;
  position: relative;
  height: 50px;
}

.form .input-bg {
  width: 100%;
  height: 100%;
  color: #595f6e;
  padding-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-bg {
  padding: 10px;
}

.form label {
  bottom: 0px;
  left: 0%;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bg-error {
  color: red;
}

.details-section {
  width: 50%;
  padding: 10px 0 50px 50px;
  background: #f8f8f8;
  border-radius: 10px;
  color: #000;
}

.top-wrapper {
  display: flex;
  flex-direction: row-reverse;
}

img {
  width: 300px;
  height: 200px;
}
</style>

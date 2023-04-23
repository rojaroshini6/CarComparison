import App from "@/components/forms/CarForm.vue";
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";

//licencePlate
describe("CarForm.vue", () => {
  it("Returns true if the licencePlate error div is present", async () => {
    const wrapper = mount(App);

    await wrapper.find(".form").trigger("submit");
    await flushPromises();
    //expect(wrapper.html()).toContain("This field is required");
    expect(wrapper.find(".licencePlateError").exists()).toBe(true);
  });

  it("Returns false when error div doesnt exist if the licencePlate input follows the format ", async () => {
    const wrapper = mount(App);
    const licencePlate = "W12";

    await wrapper.find(".licencePlate").setValue(licencePlate);
    const inputValue = wrapper.find("input").element.value;

    expect(inputValue).toEqual(licencePlate);
    await wrapper.find(".form").trigger("submit");
    await flushPromises();
    //expect(wrapper.html()).not.toContain("This field is required");
    expect(wrapper.find(".licencePlateError").exists()).toBe(false);
  });
});

//zipcode
describe("CarForm.vue", () => {
  it("Returns true if the zipcode error div is present", async () => {
    const wrapper = mount(App);

    await wrapper.find(".form").trigger("submit");
    await flushPromises();
    //expect(wrapper.html()).toContain("This field is required");
    expect(wrapper.find(".zipcodeError").exists()).toBe(true);
  });

  it("Returns false when error div doesnt exist if the zipcode input follows the format ", async () => {
    const wrapper = mount(App);
    const zipcode = "ABCD12";

    await wrapper.find(".zipcode").setValue(zipcode);
    const inputValue = wrapper.find("input").element.value;

    //expect(inputValue).toEqual(zipcode);
    await wrapper.find(".form").trigger("submit");
    await flushPromises();
    //expect(wrapper.html()).not.toContain("This field is required");
    expect(wrapper.find(".zipcodeError").exists()).toBe(false);
  });
});

//housenumber
describe("CarForm.vue", () => {
  it("Returns true if the housenumber error div is present", async () => {
    const wrapper = mount(App);

    await wrapper.find(".form").trigger("submit");
    await flushPromises();
    //expect(wrapper.html()).toContain("This field is required");
    expect(wrapper.find(".housenumberError").exists()).toBe(true);
  });

  it("Returns false when error div doesnt exist if the housenumber input follows the format ", async () => {
    const wrapper = mount(App);
    const housenumber = "W12";

    await wrapper.find(".housenumber").setValue(housenumber);
    const inputValue = wrapper.find("input").element.value;

    //expect(inputValue).toEqual(zipcode);
    await wrapper.find(".form").trigger("submit");
    await flushPromises();
    //expect(wrapper.html()).not.toContain("This field is required");
    expect(wrapper.find(".housenumberError").exists()).toBe(false);
  });
});

//dob
describe("CarForm.vue", () => {
  it("Returns true if the birthdate error div is present", async () => {
    const wrapper = mount(App);

    await wrapper.find(".form").trigger("submit");
    await flushPromises();
    //expect(wrapper.html()).toContain("This field is required");
    expect(wrapper.find(".birthdateError").exists()).toBe(true);
  });

  it("Returns false when error div doesnt exist if the birthdate input follows the format ", async () => {
    const wrapper = mount(App);
    const birthdate = "06-11-1991";

    await wrapper.find(".birthdate").setValue(birthdate);

    await wrapper.find(".form").trigger("submit");
    await flushPromises();
    //expect(wrapper.html()).not.toContain("This field is required");
    expect(wrapper.find(".birthdateError").exists()).toBe(false);
  });
});

//select
describe("CarForm.vue", () => {
  it("Compares the value of the claimFree select dropdown", async () => {
    const wrapper = mount(App);
    const claimFree = "0";

    await wrapper.find("select").setValue(claimFree);
    const selectValue = wrapper.find("select").element.value;

    expect(selectValue).toEqual(claimFree);
  });
});

describe("CarForm.vue", () => {
  it("Compares the value of the kilometrage select dropdown", async () => {
    const wrapper = mount(App);
    const kilometrage = "0";

    await wrapper.find(".kilometrage").setValue(kilometrage);
    const selectValue = wrapper.find("select").element.value;

    expect(selectValue).toEqual(kilometrage);
  });
});

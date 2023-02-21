import MONGO_DB_CONFIG from "../config/app.config";
import { ISlider, ISliderDocument, Slider } from "../models/slider.model";
import fs from "fs-extra";
import path from "path";

export async function createSlider(
  newSlider: ISlider
): Promise<ISliderDocument> {
  try {
    if (!newSlider.sliderName) {
      throw new Error("Slider name is required");
    }

    const createdSlider = new Slider(newSlider);
    await createdSlider.save();
    return createdSlider as ISliderDocument;
  } catch (error: any) {
    throw new Error(`Error creating slider  ${error.message}`);
  }
}

export async function getAllSliders(
  sliderName?: string,
  page?: string,
  pageSize?: string
): Promise<ISliderDocument> {
  try {
    let condition = sliderName
      ? { slider_name: { $regex: new RegExp(sliderName), $option: "i" } }
      : {};

    let perPage = Math.abs(parseInt(pageSize!)) || MONGO_DB_CONFIG.PAGE_SIZE;
    let pag = (Math.abs(parseInt(page!)) || 1) - 1;

    const sliders = await Slider.find(
      condition,
      "sliderName sliderDescription sliderURL sliderImage"
    )
      .limit(perPage)
      .skip(perPage * pag);

    return sliders as unknown as ISliderDocument;
  } catch (error: any) {
    throw new Error(`Error retriving sliders ${error.message}`);
  }
}

export async function getSliderById(id: string): Promise<ISliderDocument> {
  try {
    console.log(id);
    const slider = await Slider.findById(id).lean();
    if (!slider) throw "not Found slider with" + id;
    else return slider as ISliderDocument;
  } catch (error: any) {
    throw new Error(`Error retriving slider with id ${id}: ${error.message}`);
  }
}

export async function updateSlider(
  id: string,
  sliderName: string,
  sliderDescription: string,
  sliderURL: string,
  sliderImagePath: string
): Promise<ISliderDocument> {
  try {
    const slider = await Slider.findById(id).lean();
    console.log(id);
    if (slider && slider.sliderName) {
      const exist = await fs.pathExists(path.resolve(slider.sliderName));
      if (exist) await fs.unlink(path.resolve(slider.sliderName));
    }
    const updateSlider = await Slider.findByIdAndUpdate(
      id,
      {
        sliderName,
        sliderDescription,
        sliderURL,
        sliderImagePath,
      },
      { new: true }
    ).lean();
    if (!updateSlider) throw "Not found slider with id " + id;
    else return updateSlider as unknown as ISliderDocument;
  } catch (error: any) {
    throw new Error(`Error updating slider with id ${id}: ${error.message}`);
  }
}

export async function deleteSlider(id: string): Promise<ISliderDocument> {
  try {
    const slider = await Slider.findByIdAndDelete(id).lean();
    if (slider && slider.sliderImagePath) {
      const exist = await fs.pathExists(path.resolve(slider.sliderImagePath));
      if (exist) await fs.unlink(path.resolve(slider.sliderImagePath));
    }
    if (!slider) throw "Not Found Slider with id " + id;
    else return slider as ISliderDocument;
  } catch (error: any) {
    throw new Error(`Error deleting slider with id ${id}: ${error.message}`);
  }
}

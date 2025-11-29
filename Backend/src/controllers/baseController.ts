import { Model, ModelStatic, FindOptions } from "sequelize";
import { Request, Response } from "express";
import {Op} from "sequelize";
import { ro } from "@faker-js/faker";

export type ExpressHandler = (req: Request, res: Response) => Promise<void>;

class BaseController {
  private model: ModelStatic<Model<any, any>>;
  private includes: FindOptions["include"];

  constructor(
    model: ModelStatic<Model<any, any>>,
    includes: FindOptions["include"] = []
  ) {
    this.model = model;
    this.includes = includes;
  }

  getAll: ExpressHandler = async (req, res) => {
    try {
      if (Object.keys(req.query).length === 0) {
        const items = await this.model.findAll({ include: this.includes });
        res.status(200).json(items);
        return;
      }

      const { page: pageQuery, limit: limitQuery, ...restQuery } = req.query;
      const where: any = {};
      const searchKeys = Object.keys(restQuery);

      if (searchKeys.length > 0) {
        where[Op.or] = searchKeys.map((key) => ({
          [key]: { [Op.like]: `%${restQuery[key]}%` },
        }));
      }

      console.log(pageQuery, limitQuery);

      const page = pageQuery ? parseInt(pageQuery as string, 10) : 1;
      const limit = limitQuery ? parseInt(limitQuery as string, 10) : 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await this.model.findAndCountAll({
        where,
        include: this.includes,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        distinct: true,
      });

      console.log(rows);

      res.status(200).json({ total: count, data: rows });
    } catch (error) {
      res.status(500).json({
        message: `An error occurred while getting ${this.model.name}, ${error}`,
        error,
      });
    }
  };

  getById: ExpressHandler = async (req, res) => {
    try {
      const item = await this.model.findByPk(req.params.id, {
        include: this.includes,
      });
      if (!item) {
        res.status(404).json({ message: `${this.model.name} not found!` });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({
        message: `An error occurred while getting ${this.model.name}`,
        error,
      });
    }
  };

  create: ExpressHandler = async (req, res) => {
    try {
      const newItem = await this.model.create(req.body);
      res.status(201).json({
        message: `${this.model.name} added successfully!`,
        item: newItem,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `An error occurred while ${this.model.name}`, error });
    }
  };

  update: ExpressHandler = async (req, res) => {
    try {
      const [updatedRows] = await this.model.update(req.body, {
        where: { id: req.params.id },
      });

      if (updatedRows > 0) {
        const updatedItem = await this.model.findByPk(req.params.id, {
          include: this.includes,
        });
        res.status(200).json({
          message: `${this.model.name} updated successfully!`,
          data: updatedItem,
        });
        return;
      }
      res.status(404).json({ message: `${this.model.name} not found!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while updating ${this.model.name}`,
        error,
      });
    }
  };

  delete: ExpressHandler = async (req, res) => {
    try {
      const deletedRows = await this.model.destroy({
        where: { id: req.params.id },
      });

      if (deletedRows > 0) {
        res
          .status(200)
          .json({ message: `${this.model.name} deleted successfully!` });
        return;
      }
      res.status(404).json({ message: `${this.model.name} not found!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while deleting ${this.model.name}`,
        error,
      });
    }
  };
}

export default BaseController;

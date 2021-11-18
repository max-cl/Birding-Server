import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findById(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>,
    ): Promise<T | null> {
        return await this.entityModel
            .findById(entityFilterQuery, {
                _id: 0,
                __v: 0,
                ...projection,
            })
            .exec();
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
        return await this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: unknown): Promise<T> {
        return await this.entityModel.create(createEntityData);
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<T | null> {
        return await this.entityModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                new: true,
            },
        );
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(
            entityFilterQuery,
        );
        return deleteResult.deletedCount >= 1;
    }
}

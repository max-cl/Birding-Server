import {
    Document,
    Model,
    FilterQuery,
    UpdateQuery,
    UpdateWriteOpResult,
    UpdateWithAggregationPipeline,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findById(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>,
    ): Promise<T | null> {
        return await this.entityModel
            .findById(entityFilterQuery, {
                _id: 1,
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

    async insertMany(createEntityData: unknown): Promise<T> {
        return await this.entityModel.insertMany(createEntityData);
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

    async updateOne(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateWithAggregationPipeline | UpdateQuery<T>,
    ): Promise<UpdateWriteOpResult> {
        return await this.entityModel.updateOne(
            entityFilterQuery,
            updateEntityData,
        );
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(
            entityFilterQuery,
        );
        return deleteResult.deletedCount >= 1;
    }
}

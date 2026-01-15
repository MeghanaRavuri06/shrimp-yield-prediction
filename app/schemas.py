from pydantic import BaseModel, Field

class ShrimpInput(BaseModel):
    prawn_density_per_m2: float = Field(..., ge=5, le=45)
    feed_quality_index: float = Field(..., ge=0.4, le=1.0)
    water_exchange_per_month: float = Field(..., ge=1, le=12)
    DO_mg_L: float = Field(..., ge=3.0, le=8.5)
    temperature_C: float = Field(..., ge=24, le=34)
    pH: float = Field(..., ge=6.5, le=9.0)
    ammonia_mg_L: float = Field(..., ge=0.0, le=1.5)
    nitrite_mg_L: float = Field(..., ge=0.0, le=0.8)
    H2S_mg_L: float = Field(..., ge=0.0, le=0.2)
    turbidity_cm: float = Field(..., ge=20, le=80)
    salinity_ppt: float = Field(..., ge=5, le=35)
    pond_size_ha: float = Field(..., ge=0.1, le=2.5)
    recycling_efficiency_pct: float = Field(..., ge=40, le=95)
